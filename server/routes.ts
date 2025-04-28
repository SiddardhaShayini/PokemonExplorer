import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from 'axios';

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to fetch Pokemon data
  app.get("/api/pokemon", async (req, res) => {
    try {
      // Fetch the first 150 Pokemon
      const limit = 150;
      const pokemonListResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      
      if (!pokemonListResponse.data || !pokemonListResponse.data.results) {
        return res.status(404).json({ message: 'Pokemon data not found' });
      }
      
      const pokemonList = pokemonListResponse.data.results;
      
      // Fetch detailed data for each Pokemon
      const pokemonPromises = pokemonList.map(async (pokemon: any) => {
        const pokemonDetailResponse = await axios.get(pokemon.url);
        return pokemonDetailResponse.data;
      });
      
      const pokemonData = await Promise.all(pokemonPromises);
      
      return res.json(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return res.status(500).json({ 
        message: 'Failed to fetch Pokemon data from the PokeAPI' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
