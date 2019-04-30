import { Theme } from './theme';
import { ContextRequest, ContextTarget, MultiContextKey } from 'context-values';

export type StyleProvider = (theme: Theme) => void;

export const StyleProvider: ContextTarget<StyleProvider> & ContextRequest<StyleProvider[]> =
    /*#__PURE__*/ new MultiContextKey<StyleProvider>('style-provider');
