from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Test examples page
    page.goto('http://localhost:4326/examples')
    page.wait_for_load_state('networkidle')
    
    # Check console for hydration errors
    errors = []
    page.on('console', lambda msg: errors.append(msg) if msg.type == 'error' else None)
    
    # Wait a bit for any errors to appear
    page.wait_for_timeout(2000)
    
    print(f"Errors on /examples: {len(errors)}")
    for error in errors:
        print(f"  - {error.text}")
    
    # Test playroom page
    page.goto('http://localhost:4326/playroom')
    page.wait_for_load_state('networkidle')
    
    errors_playroom = []
    page.on('console', lambda msg: errors_playroom.append(msg) if msg.type == 'error' else None)
    page.wait_for_timeout(2000)
    
    print(f"Errors on /playroom: {len(errors_playroom)}")
    for error in errors_playroom:
        print(f"  - {error.text}")
    
    browser.close()
