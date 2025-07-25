import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Groq } from 'groq-sdk';
import { ConfigService } from '@nestjs/config';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class SectionsService {
  private groq: Groq;

  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('GROQ_API_KEY is not defined in environment variables');
    }
    this.groq = new Groq({ apiKey });
  }

  async generateAndSaveSections(idea: string): Promise<Section[]> {
    const sectionsSchema = {
      type: 'object',
      properties: {
        sections: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Name of the website section' },
              content: { type: 'string', description: ' description of the section content ' },
              code: { type: 'string', description: 'HTML/CSS code for the section using Tailwind CSS' },
            },
            required: ['name', 'content', 'code'],
            additionalProperties: false,
          },
        },
      },
      required: ['sections'],
      additionalProperties: false,
    };

    const prompt = `You are a web development assistant. For the website idea "${idea}", generate three website sections. For each section, provide:
1. A section name .
2. A detailed description (3-5 sentences) focusing on layout, colors, and functionality .
3. HTML/CSS code using Tailwind CSS 
Return the response as a JSON object with a "sections" array, where each section has "name", "content", and "code" properties. Ensure the output strictly adheres to the provided JSON schema.`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'moonshotai/kimi-k2-instruct',
        temperature: 0.5,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'website_sections',
            schema: sectionsSchema,
            strict: true,
          },
        },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new InternalServerErrorException('No content received from Groq API, possibly due to model refusal.');
      }

      const response = JSON.parse(content);
      const sections: Section[] = response.sections.map((section: any) => ({
        id: uuidv4(),
        name: section.name,
        content: section.content,
        code: section.code,
      }));

      await this.sectionModel.insertMany(sections);
      return sections;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new InternalServerErrorException('Generated JSON does not match the expected schema. Please try again.');
      }
      throw new InternalServerErrorException(`Groq API error: ${error.message}`);
    }
  }

  async generateUIDesign(sectionId: string, idea: string, sectionName: string): Promise<{ description: string; code: string }> {
    const uiDesignSchema = {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'Detailed description of the UI design (3-5 sentences)' },
        code: { type: 'string', description: 'Detailed HTML/CSS code for the section using Tailwind CSS' },
      },
      required: ['description', 'code'],
      additionalProperties: false,
    };

    const prompt = `You are a web development assistant. For the website idea "${idea}", provide a detailed UI design for the "${sectionName}" section. Include:
1. A detailed description (3-5 sentences) focusing on layout, colors, and functionality.
2. Detailed HTML/CSS code using Tailwind CSS (as a single string, ensure valid HTML).
Return the response as a JSON object with "description" and "code" properties. Ensure the output strictly adheres to the provided JSON schema and includes complete, valid HTML/CSS code for the section.`;

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const completion = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'moonshotai/kimi-k2-instruct',
          temperature: 0.5,
          max_tokens: 2000,
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'ui_design',
              schema: uiDesignSchema,
              strict: true,
            },
          },
        });

        const content = completion.choices[0].message.content;
        if (!content) {
          throw new InternalServerErrorException('No content received from Groq API, possibly due to model refusal.');
        }

        const uiDesign = JSON.parse(content);
        return {
          description: uiDesign.description,
          code: uiDesign.code,
        };
      } catch (error) {
        if (error.response?.status === 400) {
          attempt++;
          if (attempt === maxRetries) {
            throw new InternalServerErrorException(
              `Failed to generate valid JSON after ${maxRetries} attempts. Please try again or simplify the request.`,
            );
          }
          continue;
        }
        throw new InternalServerErrorException(`Groq API error: ${error.message}`);
      }
    }

    throw new InternalServerErrorException('Unexpected error during UI design generation');
  }
}