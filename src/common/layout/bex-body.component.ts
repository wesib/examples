import { importNodeContent, Navigation, pageLoadParam } from '@wesib/generic';
import { BootstrapWindow, Component, ComponentContext } from '@wesib/wesib';
import { eventSupply } from 'fun-events';

@Component('bex-body')
export class BexBodyComponent {

  constructor(context: ComponentContext) {

    const document = context.get(BootstrapWindow).document;
    const navigation = context.get(Navigation);

    context.whenOn(() => {

      const element: Element = context.element;
      const supply = eventSupply(() => element.innerHTML = '');
      const range = document.createRange();

      range.selectNodeContents(element);

      navigation.read.once(page => {
        page.put(
            pageLoadParam,
            {
              fragment: { id: 'bex-body' },
              receiver: {
                supply,
                receive(_ctx, response) {
                  console.log(response);
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

        return supply;
      });

      context.whenOff(() => supply.off());
    });
  }
}
