import { nodeDocument } from '@frontmeans/dom-primitives';
import { drekReplacer } from '@frontmeans/drek';
import { StypProperties } from '@frontmeans/style-producer';
import { PageRendererExecution, RenderPage } from '@wesib/navigation';
import { Component } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { ThemeSettings } from '../theme';

@Component(['main', Examples__NS])
export class MainComponent {

  @RenderPage({
    target: ({ contentRoot }) => drekReplacer(contentRoot),
  })
  renderPage({ content, response }: PageRendererExecution): void {
    if (!response.ok) {

      const doc = nodeDocument(content);

      if (response.ok == null) {
        content.appendChild(doc.createTextNode('Loading...'));
      } else {
        content.appendChild(doc.createTextNode(`Error. ${response.error}`));
      }
    }
  }

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
