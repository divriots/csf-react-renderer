import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import type { StoryContext } from '@storybook/csf';

export const render = (args, { component }: StoryContext) => {
  return createElement(component as any, args);
};

// A map of all rendered React 18 nodes
const nodes = new Map<Element, Root>();

const getReactRoot = (el: Element): Root | null => {
  let root = nodes.get(el);
  if (!root) {
    root = createRoot(el);
    nodes.set(el, root);
  }

  return root;
};

export async function renderToDOM(
  { storyFn, storyContext, unboundStoryFn },
  domElement
) {
  const root = getReactRoot(domElement);
  root.render(storyFn ? storyFn() : unboundStoryFn(storyContext));
  return () => {
    nodes.delete(domElement);
    root.unmount();
  };
}
