def get_category_from_link(link):
    categories = {
        'sport': ['sport', 'sports', 'live-sport'],
        'business': ['business'],
        'politics': ['politics'],
        'culture': ['culture'],
        'lifestyle': ['lifestyle', 'life-style', 'arts-entertainment', 'lifeandstyle', 'art-entertainment'],
        'world': ['world-news', 'world']
    }
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in link:
                return category
    return None
