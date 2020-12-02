import { QualifiedName } from '@frontmeans/namespace-aliaser';
import { stypRules, StypRules } from '@frontmeans/style-producer';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { BootstrapContext, Component, ComponentContext } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { mediaStyle, ThemeSettings } from '../theme';
import { MainComponent, mainStyle } from './main.component';
import { NavComponent } from './nav.component';

@Component({
  name: ['container', Examples__NS],
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

    const { elementDef: { name: mainName } } = await this._context.get(BootstrapContext).whenDefined(MainComponent);

    return this._context.get(Theme).style(ContainerStyle(mainName!));
  }

}

const Container__qualifier = 'bex:container';

function ContainerStyle(mainName: QualifiedName): (theme: Theme) => StypRules {
  return theme => {

    const settings = theme.ref(ThemeSettings).read();
    const { root: { rules } } = theme;

    return stypRules(
        rules.add(
            { u: [':', 'host'], $: Container__qualifier },
            {
              height: '100%',
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'stretch',
              alignContent: 'flex-start',
            },
        ).add(
            settings.keepThru(mediaStyle),
        ),
        rules.add(
            { u: [':', 'host'], $: [Container__qualifier, '@media:sm'] },
            {
              height: 'auto',
            },
        ),
        rules.add(
            [{ u: [':', 'host'], $: Container__qualifier }, { e: mainName, $: Container__qualifier }],
            settings.keepThru(mainStyle),
        ),
    );
  };
}
