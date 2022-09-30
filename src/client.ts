import { createRoot, Root } from 'react-dom/client';
import React from 'react';
export {render} from './render';

// A map of all rendered React 18 nodes
const nodes = new Map<Element, Root>();

const getReactRoot = (el: Element): Root => {
  let root = nodes.get(el);
  if (!root) {
    root = createRoot(el);
    nodes.set(el, root);
  }
  return root;
};

export async function renderToDOM(
  {
    storyContext,
    unboundStoryFn,
  },
  domElement
) {
  const root = getReactRoot(domElement);
  root.render(React.createElement(unboundStoryFn, storyContext));
  return () => {
    nodes.delete(domElement);
    root.unmount();
  };
}
