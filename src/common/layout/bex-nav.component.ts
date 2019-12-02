import { ComponentNode, Navigation, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { afterAll, DomEventDispatcher } from 'fun-events';
import { StypLengthPt, StypProperties, stypRoot } from 'style-producer';
import { ThemeSettings } from '../theme';

const activeNavLinkClass = 'bex-nav-active';

@Component('bex-nav')
export class BexNavComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);

    const node = context.get(ComponentNode);
    const navigation = context.get(Navigation);

    context.whenOn(supply => {

      const navLinks = node.select('a', { all: true });

      navLinks.read({
        supply,
        receive(_, links) {
          links.forEach(
              link => new DomEventDispatcher(link.element)
                  .on('click')
                  .instead(() => navigation.open(link.attribute('href').it || ''))
                  .needs(supply),
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
              element.classList.add(activeNavLinkClass);
            } else {
              element.classList.remove(activeNavLinkClass);
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
