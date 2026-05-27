/**
 * Svelte action that teleports an element to document.body.
 * Fixes positioning issues when a component is mounted inside
 * a positioned ancestor (relative, transform, etc).
 */
export function portal(node: HTMLElement) {
  const parent = node.parentNode;
  document.body.appendChild(node);

  return {
    destroy() {
      node.parentNode?.removeChild(node);
      // Restore to original parent if still in DOM (HMR)
      if (parent && !node.isConnected) parent.appendChild(node);
    },
  };
}
