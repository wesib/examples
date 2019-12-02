import { ComponentNode, Navigation, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext, DefaultNamespaceAliaser } from '@wesib/wesib';
import { afterAll, DomEventDispatcher } from 'fun-events';
import { css__naming, QualifiedName } from 'namespace-aliaser';
import { StypLengthPt, StypProperties, stypRoot } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { ThemeSettings } from '../theme';

const activeNavLinkClass: QualifiedName = ['nav-active', BEX__NS];

@Component({
  name: ['nav', BEX__NS],
})
export class BexNavComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);

    const nsAlias = context.get(DefaultNamespaceAliaser);
    const activeClass = css__naming.name(activeNavLinkClass, nsAlias);
    const node = context.get(ComponentNode);
    const navigation = context.get(Navigation);

    context.whenOn(supply => {

      const navLinks = node.select('a', { all: true });

      navLinks.read({
        supply,
        receive(_, links) {
          links.forEach(
              link => {

                const element: Element = link.element;

                new DomEventDispatcher(element)
                    .on('click')
                    .instead(() => {
                      if (!element.classList.contains(activeClass)) {
                        navigation.open(element.getAttribute('href') || '');
                      }
                    })
                    .needs(supply);
              },
          );
        },
      });
      afterAll({
        links: navLinks,
        page: navigation,
      })({
        supply,
        receive(
            _ctx,
            {
              links: [links],
              page: [page],
            },
        ) {
          links.forEach(link => {

            const element: HTMLAnchorElement = link.element;

            if (dirName(page.url).startsWith(dirName(new URL(element.href)))) {
              element.classList.add(activeClass);
            } else {
              element.classList.remove(activeClass);
            }
          });
        },
      });
    });
  }

  @ProduceStyle()
  style() {

    const settings = this._theme.ref(ThemeSettings).read.keep;
    const root = stypRoot(settings.thru(navStyle));

    root.rules.add({ e: 'a' }, settings.thru(navLinkStyle));
    root.rules.add({ e: 'a', c: activeNavLinkClass }, settings.thru(activeNavLinkStyle));

    return root.rules;
  }

}

function dirName(url: URL): string {

  const path = url.pathname;

  if (path.endsWith('/')) {
    return path;
  }

  return path + '/';
}

function navStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    padding: 0,
    margin: `0 ${$fontSize.div(2)} 0 0`,
  };
}

function navLinkStyle(
    {
      $fontSize,
      $bgColor,
    }: ThemeSettings,
): StypProperties {
  return {
    display: 'block',
    margin: 0,
    padding: `${$fontSize.div(2)} ${$fontSize}`,
    border: 0,
    outline: 0,
    background: $bgColor.hsl.set(({ l }) => ({ l: l * 0.8 })),
  };
}

function activeNavLinkStyle(
    {
      $fontSize,
      $color,
    }: ThemeSettings,
): StypProperties {

  const borderW = StypLengthPt.of(4, 'px');

  return {
    background: 'transparent',
    borderLeft: `${borderW} solid ${$color}`,
    paddingLeft: $fontSize.sub(borderW),
  };
}
