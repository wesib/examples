import { ComponentNode, Navigation } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { afterSupplied, DomEventDispatcher } from 'fun-events';

@Component('bex-nav')
export class BexNavComponent {

  constructor(context: ComponentContext) {

    const node = context.get(ComponentNode);
    const navigation = context.get(Navigation);

    afterSupplied(node.select('a', { all: true }))(links => {
      links.forEach(link => {
        new DomEventDispatcher(link.element)
            .on('click')
            .instead(() => navigation.open(link.attribute('href').it || ''));
      });
    });
  }

}
