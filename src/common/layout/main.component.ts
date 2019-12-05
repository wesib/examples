import { importNodeContent, Navigation, pageLoadParam, ProduceStyle, Theme } from '@wesib/generic';
import { BootstrapWindow, Component, ComponentContext } from '@wesib/wesib';
import { StypProperties, stypRoot } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { ThemeSettings } from '../theme';

@Component({
  name: ['main', BEX__NS],
})
export class MainComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);

    const document = context.get(BootstrapWindow).document;
    const navigation = context.get(Navigation);

    context.whenOn(supply => {

      const element: Element = context.element;
      const range = document.createRange();

      supply.whenOff(() => range.deleteContents());
      range.selectNodeContents(element);

      navigation.read.once(page => {
        page.put(
            pageLoadParam,
            {
              fragment: { tag: element.tagName },
              receiver: {
                supply,
                receive(_ctx, response) {
                  if (response.ok) {
                    range.deleteContents();

                    const target = document.createDocumentFragment();
                    const { fragment } = response;

                    if (fragment) {
                      importNodeContent(fragment, target);
                      range.insertNode(target);
                    }
                  } else if (response.ok === false) {
                    range.deleteContents();
                    range.insertNode(document.createTextNode(`Error. ${response.error}`));
                  } else {
                    range.deleteContents();
                    range.insertNode(document.createTextNode('Loading...'));
                  }
                },
              },
            },
        );
      });
    });
  }

  @ProduceStyle()
  style() {

    const settings = this._theme.ref(ThemeSettings).read.keep;
    const root = stypRoot(settings.thru(bexBodyStyle));

    return root.rules;
  }

}

function bexBodyStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    padding: 0,
    margin: `0 0 0 ${$fontSize.div(2)}`,
  };
}
