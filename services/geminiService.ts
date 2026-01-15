
import { GoogleGenAI, Type } from "@google/genai";
import { RestaurantInfo } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initializing with named parameter and process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateResponse(userMessage: string, restaurant: RestaurantInfo): Promise<{ found: boolean; response: string }> {
    const prompt = `
      You are an AI customer support agent for the restaurant "${restaurant.name}". 
      Your goal is to answer customer questions strictly using the information provided below.
      
      RESTAURANT DATA:
      - Hours: ${restaurant.hours}
      - Address: ${restaurant.address}
      - Phone: ${restaurant.phone}
      - Website: ${restaurant.website}
      - Booking URL: ${restaurant.bookingUrl}
      - Menu Info: ${restaurant.menuText}
      - Allergens: ${restaurant.allergensInfo}
      - FAQs: ${restaurant.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join(' | ')}
      - Extra Services: ${restaurant.services.map(s => `${s.title}: ${s.description} (${s.price})`).join(' | ')}

      RULES:
      1. Always speak in the first person plural (e.g., "Nuestro horario", "Te esperamos").
      2. Always mention the restaurant name: "${restaurant.name}".
      3. Be polite and use emojis (e.g., 😊, 🍴).
      4. CRITICAL: If the answer is NOT in the data provided, set "found" to false. Do NOT invent anything.
      5. If the answer IS found, set "found" to true and provide the response.

      Customer asked: "${userMessage}"
    `;

    try {
      const result = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              found: { type: Type.BOOLEAN, description: "Whether the answer was found in the data." },
              response: { type: Type.STRING, description: "The response to the customer." }
            },
            required: ["found", "response"]
          }
        }
      });

      // result.text is a property getter, used correctly without parentheses
      const data = JSON.parse(result.text || '{"found": false, "response": ""}');
      
      if (!data.found) {
        return {
          found: false,
          response: `Hola 😊 Gracias por contactar con ${restaurant.name}. Un compañero te responderá lo antes posible.`
        };
      }

      return data;
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        found: false,
        response: `Hola 😊 Gracias por contactar con ${restaurant.name}. Un compañero te responderá lo antes posible.`
      };
    }
  }
}

export const geminiService = new GeminiService();
