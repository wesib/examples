import { ProduceStyle, Theme } from '@wesib/generic';
import { BootstrapContext, Component, ComponentContext } from '@wesib/wesib';
import { stypRoot, StypRules } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { mediaStyle, ThemeSettings } from '../theme';
import { MainComponent } from './main.component';
import { NavComponent, navLinkBackground } from './nav.component';

@Component({
  name: ['container', BEX__NS],
  feature: {
    needs: [
      MainComponent,
      NavComponent,
    ],
  },
})
export class ContainerComponent {

  constructor(private readonly _context: ComponentContext) {
  }

  @ProduceStyle()
  async style(): Promise<StypRules> {

    const bsContext = this._context.get(BootstrapContext);
    const { elementDef: { name: navName } } = await bsContext.whenDefined(NavComponent);
    const { elementDef: { name: mainName } } = await bsContext.whenDefined(MainComponent);
    const theme = this._context.get(Theme);
    const settings = theme.ref(ThemeSettings).read.keep;

    const { rules } = stypRoot({
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      alignContent: 'flex-start',
    }).add(
        settings.thru(mediaStyle),
    );
    rules.add(
        { s: ' ', $: '@media:sm' },
        {
          height: 'auto',
        },
    );
    rules.add(
        { e: navName },
        settings.thru(sts => ({
          flex: '0 1 200px',
          height: '100%',
          background: navLinkBackground(sts),
        })),
    );
    rules.add(
        { e: navName, $: '@media:sm' },
        {
          flex: '0 1 100%',
        },
    );
    rules.add(
        { e: mainName },
        settings.thru(({ $fontSize }) => ({
          flex: '1 1 auto',
          margin: $fontSize,
        })),
    );

    return rules;
  }

}
