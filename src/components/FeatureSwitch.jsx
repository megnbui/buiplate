import React from 'react';
import Enums from 'enums';
import { OptimizelyFeature } from '@optimizely/react-sdk';

interface SwitchVariantProps {
  children: React.ReactNode;
  feature: Enums.ActiveOptimizelyFeatures;
  variant: 'enabled' | 'disabled';
}

interface FeatureSwitchProps {
  feature: Enums.ActiveOptimizelyFeatures;
  children:
    | React.ReactElement<SwitchVariantProps>
    | React.ReactElement<SwitchVariantProps>[];
}

const SwitchVariant = ({ children, feature, variant }: SwitchVariantProps) =>
  !feature ? null : (
    <OptimizelyFeature feature={feature}>
      {(isEnabled, variables) =>
        (isEnabled && variant !== 'disabled') ||
        (!isEnabled && variant === 'disabled')
          ? React.Children.toArray(children).map((child) =>
              typeof child === 'object' && 'props' in child
                ? React.cloneElement(child, { variables, feature })
                : child
            )
          : null
      }
    </OptimizelyFeature>
  );

/**
 * @example
 *  import Feature from 'components/FeatureSwitch';
 *
 *  <Feature.Enabled feature={ActiveOptimizelyFeatures.featureName}>
 *    This feature is enabled.
 *  </Feature.Enabled>
 */
export const Enabled = (props) => (
  <SwitchVariant {...props} variant="enabled" />
);
/**
 * @example
 *  import Feature from 'components/FeatureSwitch';
 *
 *  <Feature.Disabled feature={ActiveOptimizelyFeatures.featureName}>
 *    This feature is coming soon.
 *  </Feature.Disabled>
 */
export const Disabled = (props) => (
  <SwitchVariant {...props} variant="disabled" />
);

/**
 * Passes the feature value on to the Enabled and Disabled variant children
 * @example
 *  import { FeatureSwitch } from 'components/FeatureSwitch';
 *
 *  <FeatureSwitch feature={ActiveOptimizelyFeatures.featureName}>
 *    <Enabled>
 *      Check out this new feature!
 *    </Enabled>
 *    <Disabled>
 *      Feature is coming soon!
 *    </Disabled>
 *  </FeatureSwitch>
 */
export const FeatureSwitch = ({ feature, children }: FeatureSwitchProps) => (
  <>
    {!children
      ? null
      : React.Children.toArray(children).map((child) =>
          React.cloneElement(child, { feature })
        )}
  </>
);

export default { Enabled, Disabled };
