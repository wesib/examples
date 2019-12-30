import { Component } from '@wesib/wesib';
import { AppFeature, Examples__NS } from '../common';

@Component({
  name: ['title', Examples__NS],
  feature: {
    needs: [AppFeature],
  },
})
export class TitleComponent {
}
