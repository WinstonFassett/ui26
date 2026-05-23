class Ui26HashTabs extends HTMLElement {
  private tabs: HTMLElement[] = [];
  private panels: HTMLElement[] = [];
  private base = "";

  connectedCallback() {
    this.base = this.dataset.base ?? "";
    const tablist = this.querySelector(":scope > .tablist");
    this.tabs = tablist ? [...tablist.querySelectorAll<HTMLElement>(":scope > [data-hash]")] : [];
    this.panels = [...this.querySelectorAll<HTMLElement>(":scope > [data-ui26-hash-panel]")];

    // Prevent scroll-to-anchor on tab clicks
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const hash = (tab as HTMLAnchorElement).href.split("#")[1];
        history.pushState(null, "", `#${hash}`);
        this.sync();
      });
    });

    // Keyboard nav (APG pattern)
    this.tabs.forEach((tab, i) => {
      tab.setAttribute("tabindex", "0");
      tab.addEventListener("keydown", (e) => {
        const next =
          e.key === "ArrowRight" ? i + 1 :
          e.key === "ArrowLeft"  ? i - 1 :
          e.key === "Home"       ? 0 :
          e.key === "End"        ? this.tabs.length - 1 :
          null;
        if (next === null || !this.tabs[next]) return;
        e.preventDefault();
        const href = (this.tabs[next] as HTMLAnchorElement).href.split("#")[1];
        history.pushState(null, "", `#${href}`);
        this.sync();
        this.tabs[next]?.focus();
      });
    });

    window.addEventListener("hashchange", () => this.sync());
    this.sync();
  }

  private sync() {
    const hash = location.hash.slice(1);
    const activeHash = hash && this.panels.some((p) => p.id === hash)
      ? hash
      : this.panels[0]?.id ?? "";

    this.tabs.forEach((tab) => {
      const tabHash = (tab as HTMLAnchorElement).href.split("#")[1];
      const active = tabHash === activeHash;
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
      tab.dataset.state = active ? "active" : "inactive";
    });

    this.panels.forEach((panel) => {
      const active = panel.id === activeHash;
      panel.dataset.state = active ? "active" : "inactive";
      // Take over visibility from CSS :target so state is JS-driven when JS is on
      panel.style.display = active ? "block" : "none";
    });
  }
}

if (!customElements.get("ui26-hash-tabs")) {
  customElements.define("ui26-hash-tabs", Ui26HashTabs);
}
