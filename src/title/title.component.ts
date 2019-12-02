import { Component } from '@wesib/wesib';
import { AppFeature, BEX__NS } from '../common';

@Component({
  name: ['title', BEX__NS],
  feature: {
    needs: [AppFeature],
  },
})
export class TitleComponent {
}
