import streamlit as st
import requests
import pandas as pd
from PIL import Image
from io import BytesIO

# Set page configuration
st.set_page_config(
    page_title="Pokémon Explorer",
    page_icon="🔍",
    layout="wide"
)

# Define Pokemon types and their colors
POKEMON_TYPES = [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", 
    "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", 
    "Steel", "Fairy"
]

TYPE_COLORS = {
    "normal": "#A8A878",
    "fire": "#F08030",
    "water": "#6890F0",
    "electric": "#F8D030",
    "grass": "#78C850",
    "ice": "#98D8D8",
    "fighting": "#C03028",
    "poison": "#A040A0",
    "ground": "#E0C068",
    "flying": "#A890F0",
    "psychic": "#F85888",
    "bug": "#A8B820",
    "rock": "#B8A038",
    "ghost": "#705898",
    "dragon": "#7038F8",
    "dark": "#705848",
    "steel": "#B8B8D0",
    "fairy": "#EE99AC"
}

# Cache the API calls to improve performance
@st.cache_data(ttl=3600)
def fetch_pokemons(limit=150):
    """Fetch all Pokemon data from the API"""
    url = f"https://pokeapi.co/api/v2/pokemon?limit={limit}"
    response = requests.get(url)
    if response.status_code == 200:
        results = response.json()["results"]
        pokemons = []
        
        # Fetch detailed data for each Pokemon
        for pokemon in results:
            pokemon_data = fetch_pokemon_details(pokemon["url"])
            if pokemon_data:
                pokemons.append(pokemon_data)
        
        return pokemons
    return []

@st.cache_data(ttl=3600)
def fetch_pokemon_details(url):
    """Fetch detailed information about a specific Pokemon"""
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            "id": data["id"],
            "name": data["name"].capitalize(),
            "height": data["height"] / 10,  # Convert to meters
            "weight": data["weight"] / 10,  # Convert to kilograms
            "types": [t["type"]["name"] for t in data["types"]],
            "sprite": data["sprites"]["front_default"],
            "artwork": data["sprites"]["other"]["official-artwork"]["front_default"]
        }
    return None

# Format height and weight
def format_height(height):
    return f"{height:.1f} m"

def format_weight(weight):
    return f"{weight:.1f} kg"

# Custom CSS to style the app like the React version
st.markdown("""
<style>
    /* Main styling */
    .main {
        background-color: #f5f5f5;
    }
    
    /* Header styling */
    .header-container {
        padding: 1rem;
        background: linear-gradient(135deg, #ff5252, #b33939);
        color: white;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }
    
    /* Card styling */
    .pokemon-card {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        transition: transform 0.2s;
        height: 100%;
    }
    
    .pokemon-card:hover {
        transform: translateY(-5px);
    }
    
    .pokemon-id {
        color: #718096;
        font-size: 0.875rem;
    }
    
    .pokemon-name {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .pokemon-image {
        max-width: 120px;
        margin: 0 auto;
        display: block;
    }
    
    .type-badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        color: white;
        margin-right: 0.25rem;
        margin-bottom: 0.25rem;
    }
    
    /* Filter container */
    .filter-container {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }
    
    .stButton button {
        border-radius: 0.25rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="header-container">
    <h1>Pokémon Explorer</h1>
    <p>Search and filter through the first 150 Pokémon</p>
</div>
""", unsafe_allow_html=True)

# Filters section
st.markdown('<div class="filter-container">', unsafe_allow_html=True)
col1, col2 = st.columns([3, 1])

with col1:
    search_term = st.text_input("Search Pokémon", value="", placeholder="Enter Pokémon name...")

with col2:
    selected_type = st.selectbox("Filter by Type", ["All Types"] + POKEMON_TYPES)

# Add reset filters button if filters are applied
has_filters = search_term or (selected_type != "All Types")
if has_filters:
    st.button("Clear All Filters", key="clear_filters", on_click=lambda: st.session_state.update({"search_term": "", "selected_type": "All Types"}))
st.markdown('</div>', unsafe_allow_html=True)

# Initialize session state for pagination
if 'page' not in st.session_state:
    st.session_state.page = 1
if 'items_per_page' not in st.session_state:
    st.session_state.items_per_page = 12

# Fetch Pokemon data
with st.spinner("Loading Pokémon data..."):
    all_pokemons = fetch_pokemons()

# Filter the Pokemon
filtered_pokemons = all_pokemons

# Apply search filter
if search_term:
    filtered_pokemons = [p for p in filtered_pokemons if search_term.lower() in p["name"].lower()]

# Apply type filter
if selected_type and selected_type != "All Types":
    filtered_pokemons = [p for p in filtered_pokemons if selected_type.lower() in [t.lower() for t in p["types"]]]

# Display total count of filtered Pokemon
st.write(f"Showing {len(filtered_pokemons)} of {len(all_pokemons)} Pokémon")

# Pagination logic
total_pages = max(1, (len(filtered_pokemons) + st.session_state.items_per_page - 1) // st.session_state.items_per_page)
start_idx = (st.session_state.page - 1) * st.session_state.items_per_page
end_idx = min(start_idx + st.session_state.items_per_page, len(filtered_pokemons))

# Create a grid layout for Pokemon cards
if not filtered_pokemons:
    st.info("No Pokémon found. Try adjusting your filters.")
else:
    # Display the cards in a grid (3 columns)
    cols = st.columns(3)
    
    for i, pokemon in enumerate(filtered_pokemons[start_idx:end_idx]):
        with cols[i % 3]:
            st.markdown(f"""
            <div class="pokemon-card">
                <div class="pokemon-id">#{pokemon['id']:03d}</div>
                <div class="pokemon-name">{pokemon['name']}</div>
                <img src="{pokemon['artwork']}" alt="{pokemon['name']}" class="pokemon-image">
                <div style="margin-top: 0.5rem;">
                    {''.join([f'<span class="type-badge" style="background-color: {TYPE_COLORS.get(t.lower(), "#777")};">{t.capitalize()}</span>' for t in pokemon['types']])}
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.875rem;">
                    Height: {format_height(pokemon['height'])} | Weight: {format_weight(pokemon['weight'])}
                </div>
            </div>
            <br>
            """, unsafe_allow_html=True)

# Pagination controls
st.markdown('<div class="pagination">', unsafe_allow_html=True)
col1, col2, col3 = st.columns([1, 3, 1])

with col1:
    if st.session_state.page > 1:
        if st.button("← Previous"):
            st.session_state.page -= 1
            st.rerun()

with col2:
    st.write(f"Page {st.session_state.page} of {total_pages}")

with col3:
    if st.session_state.page < total_pages:
        if st.button("Next →"):
            st.session_state.page += 1
            st.rerun()

st.markdown('</div>', unsafe_allow_html=True)

# Footer
st.markdown("""
<div style="text-align: center; margin-top: 2rem; padding: 1rem; color: #718096;">
    <p>Data from <a href="https://pokeapi.co/">PokeAPI</a></p>
</div>
""", unsafe_allow_html=True)