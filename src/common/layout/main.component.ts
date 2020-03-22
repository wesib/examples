import { StypProperties } from '@proc7ts/style-producer';
import { IncludePage } from '@wesib/generic';
import { Component } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { ThemeSettings } from '../theme';

@Component(
    ['main', Examples__NS],
    IncludePage({
      onResponse({ response, range }) {
        if (!response.ok) {
          range.deleteContents();
          if (response.ok == null) {
            range.insertNode(document.createTextNode('Loading...'));
          } else {
            range.insertNode(document.createTextNode(`Error. ${response.error}`));
          }
        }
      },
    }),
)
export class MainComponent {
}

export function mainStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    flex: '1 1 auto',
    padding: 0,
    margin: `0 0 0 ${$fontSize.div(2)}`,
  };
}
