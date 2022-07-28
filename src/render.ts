import React from 'react';
import type { StoryContext } from '@storybook/csf';

export const render = (args, { id, component }: StoryContext) => {
  if (!component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }
  return React.createElement(component as any, args);
};
