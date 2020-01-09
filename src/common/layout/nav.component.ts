import { ComponentNode, ElementNode, Navigation, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext, DefaultNamespaceAliaser } from '@wesib/wesib';
import { afterAll, DomEventDispatcher, EventSupply } from 'fun-events';
import { css__naming, QualifiedName } from 'namespace-aliaser';
import { StypColor, StypLengthPt, StypProperties, stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { ThemeSettings } from '../theme';

@Component(['nav', Examples__NS])
export class NavComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);

    const nsAlias = context.get(DefaultNamespaceAliaser);
    const activeClass = css__naming.name(activeNavLinkClass, nsAlias);
    const node = context.get(ComponentNode);
    const navigation = context.get(Navigation);

    context.whenOn(supply => {

      const navLinks = node.select('a', { all: true });
      const linkSupplies = new Map<ElementNode, EventSupply>();

      navLinks.track.tillOff(supply)((added, removed) => {
        removed.forEach(link => {

          const linkSupply = linkSupplies.get(link);

          if (linkSupply) {
            linkSupplies.delete(link);
            linkSupply.off();
          }
        });
        added.forEach(
            link => {

              const element: Element = link.element;
              const linkSupply = new DomEventDispatcher(element)
                  .on('click')
                  .instead(() => {
                    if (!element.classList.contains(activeClass)) {
                      navigation.open(element.getAttribute('href') || '');
                    }
                  })
                  .needs(supply);

              linkSupplies.set(link, linkSupply);
            },
        );
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

          const pageDir = dirName(page.url);
          let activeElement: Element | undefined;
          let activeDir = '';

          links.forEach(link => {

            const element: HTMLAnchorElement = link.element;
            const linkDir = dirName(new URL(element.href));

            element.classList.remove(activeClass);

            if (pageDir.startsWith(linkDir) && activeDir.length < linkDir.length) {
              activeElement = element;
              activeDir = linkDir;
            }
          });

          if (activeElement) {
            activeElement.classList.add(activeClass);
          }
        },
      });
    });
  }

  @ProduceStyle()
  style() {
    return this._theme.style(NavStyle);
  }

}

function dirName(url: URL): string {

  const path = url.pathname;

  if (path.endsWith('/')) {
    return path;
  }

  return path + '/';
}

const Nav__qualifier = 'bex:nav';

function NavStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: Nav__qualifier },
          settings.thru(navStyle),
      ),
      rules.add(
          { u: [':', 'host'], $: Nav__qualifier },
          settings.thru(sts => ({
            flex: '0 1 200px',
            height: '100%',
            background: navLinkBackground(sts),
          })),
      ),
      rules.add(
          { u: [':', 'host'], $: [Nav__qualifier, '@media:sm'] },
          {
            flex: '0 1 100%',
          },
      ),
      rules.add(
          [{ u: [':', 'host'], $: Nav__qualifier }, { e: 'a', $: Nav__qualifier }],
          settings.thru(navLinkStyle),
      ),
      rules.add(
          [{ u: [':', 'host'], $: Nav__qualifier }, { e: 'a', c: activeNavLinkClass, $: Nav__qualifier }],
          settings.thru(activeNavLinkStyle),
      ),
  );
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

const activeNavLinkClass: QualifiedName = ['nav-active', Examples__NS];

export function navLinkBackground({ $bgColor }: ThemeSettings): StypColor {
  return $bgColor.hsl.set(({ l }) => ({ l: l * 0.8 }));
}

function navLinkStyle(
    settings: ThemeSettings,
): StypProperties {

  const { $fontSize } = settings;

  return {
    display: 'block',
    margin: 0,
    padding: `${$fontSize.div(2)} ${$fontSize}`,
    border: 0,
    outline: 0,
    background: navLinkBackground(settings),
  };
}

function activeNavLinkStyle(
    {
      $fontSize,
      $color,
      $bgColor,
    }: ThemeSettings,
): StypProperties {

  const borderW = StypLengthPt.of(4, 'px');

  return {
    background: $bgColor,
    borderLeft: `${borderW} solid ${$color}`,
    paddingLeft: $fontSize.sub(borderW),
  };
}
