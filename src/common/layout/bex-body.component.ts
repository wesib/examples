import { importNodeContent, Navigation, pageLoadParam } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { eventSupply } from 'fun-events';

@Component('bex-body')
export class BexBodyComponent {

  constructor(context: ComponentContext) {

    const navigation = context.get(Navigation);

    context.whenOn(() => {

      const element: HTMLElement = context.element;
      const supply = eventSupply(() => element.innerHTML = '');

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
                    element.innerHTML = '';

                    const { fragment } = response;

                    if (fragment) {
                      importNodeContent(fragment, element);
                    }
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
