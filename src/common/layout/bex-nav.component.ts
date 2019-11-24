import { ComponentNode, Navigation } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { DomEventDispatcher } from 'fun-events';

@Component('bex-nav')
export class BexNavComponent {

  constructor(context: ComponentContext) {

    const node = context.get(ComponentNode);
    const navigation = context.get(Navigation);

    node.select('a', { all: true }).read(links => {
      links.forEach(link => {
        new DomEventDispatcher(link.element)
            .on('click')
            .instead(() => navigation.open(link.attribute('href').it || ''));
      });
    });
  }

}
