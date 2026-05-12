import re
from bs4 import BeautifulSoup

# The HTML content you provided
html_content = """<!DOCTYPE html><html lang="en"><head>..."""  # Truncated for brevity

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Function to extract grape varieties and other wine facts
def extract_wine_facts(soup):
    wine_facts = {}

    # Extract major grape varieties sections
    grape_variety_headers = soup.find_all('h5')
    for header in grape_variety_headers:
        grape_name = header.get_text(strip=True)
        if grape_name:
            description = header.find_next_sibling('p').get_text(strip=True)
            wine_facts[grape_name] = description

    # Extract additional wine facts from unordered list
    facts_section = soup.find('h5', text='Michigan Wine Facts').find_next('ul')
    if facts_section:
        facts = facts_section.find_all('li')
        for fact in facts:
            text = fact.get_text(strip=True)
            if ':' in text:
                key, value = text.split(':', 1)
                wine_facts[key.strip()] = value.strip()
            else:
                wine_facts[text] = None

    return wine_facts

# Extract and print the wine facts
wine_facts = extract_wine_facts(soup)
for key, value in wine_facts.items():
    print(f"{key}: {value}")

# Alternatively, print the dictionary directly
print(wine_facts)
