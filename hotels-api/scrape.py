import re
from typing import List

from playwright.sync_api import sync_playwright

#   read me playwright should be installed playwright install
def scrape_hotels(name: str):
    def safe_get_text(locator, default=""):
        try:
            return locator.first.inner_text()
        except:
            return default

    def safe_get_attribute(locator, attribute, default=""):
        try:
            return locator.first.get_attribute(attribute)
        except:
            return default

    def create_locator(tag: str = "div", attribute: str = "data-testid", value: str = "", nested: str = "") -> str:
        base_locator = f'//{tag}[@{attribute}="{value}"]'
        if nested:
            return f'{base_locator}//{nested}'
        return base_locator

    with sync_playwright() as p:
        page_url = f"https://www.booking.com/searchresults.es.html?ss={name.replace(' ', '+')}"
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(page_url, timeout=10000)

        try:
            hotels = page.locator(create_locator(value="property-card")).first
            url = safe_get_attribute(hotels.locator(create_locator(tag="a", value="title-link")), 'href')
            page.goto(url, timeout=10000)

            image_elements = page.locator(create_locator(value="GalleryDesktop-wrapper", nested="img"))
            image_srcs = [img.get_attribute('src') for img in image_elements.element_handles()]
            hotel = {
                    "name": safe_get_text(page.locator("h2")),
                    "location": safe_get_text(page.locator(create_locator(value="PropertyHeaderAddressDesktop-wrapper"))).split("\n")[0],
                    "description": safe_get_text(page.locator(create_locator(attribute="class", value="hp_desc_main_content"))),
                    "review_mark": safe_get_text(page.locator(create_locator( value="review-score-component"))).split("\n")[1] if page.locator(create_locator( value="review-score-component")) else "",
                    "comments_count": extract_numbers(safe_get_text(page.locator(create_locator( value="review-score-component"))).split("\n")[3]) if page.locator(create_locator( value="review-score-component")) else [],
                    "amenities": safe_get_text(page.locator(create_locator( value="property-highlights"))).split("\n"),
                    "image_srcs": image_srcs,
                    "average_price": 0
            }
        except TimeoutError:
            return {}
        finally:
         browser.close()

    return hotel

def extract_numbers(text: str) -> int:
    # Regular expression to match numbers with optional decimal points
    pattern = r'\d+\.\d+|\d+'
    # Convert matches to float
    return int(re.findall(pattern, text)[0].replace(".", ""))