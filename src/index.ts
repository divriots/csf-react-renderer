import React from 'react';
import ReactDOM, { version as reactDomVersion } from 'react-dom';
import type { StoryContext } from '@storybook/csf';

export const render = (args, { id, component }: StoryContext) => {
  if (!component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }
  return React.createElement(component as any, args);
};

const canUseNewReactRootApi =
  reactDomVersion && (reactDomVersion.startsWith('18') || reactDomVersion.startsWith('0.0.0'));


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
  const node = storyFn ? storyFn() : unboundStoryFn(storyContext)
  if (canUseNewReactRootApi) {
    const root = getReactRoot(domElement);
    root.render(node);
    return () => {
      nodes.delete(domElement);
      root.unmount();
    };
  } else {
    await new Promise<void>((resolve) => 
      ReactDOM.render(node, domElement, () => resolve())
    );
    return () => ReactDOM.unmountComponentAtNode(domElement);
  }
}
