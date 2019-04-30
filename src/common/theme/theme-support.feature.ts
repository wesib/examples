import { FeatureDef, FeatureDef__symbol } from '@wesib/wesib';
import { Theme } from './theme';
import { StyleProducerSupport } from '@wesib/generic';

const ThemeSupport__feature: FeatureDef = {
  needs: StyleProducerSupport,
  set: { as: Theme },
};

export class ThemeSupport {

  static get [FeatureDef__symbol]() {
    return ThemeSupport__feature;
  }

}
