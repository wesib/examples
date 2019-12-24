import { bootstrapComponents } from '@wesib/wesib';
import { AppFeature } from './app.feature';

export * from './app.feature';
export * from './bex.ns';
export * from './input';
export * from './theme';

export const examplesContext = bootstrapComponents(AppFeature);
