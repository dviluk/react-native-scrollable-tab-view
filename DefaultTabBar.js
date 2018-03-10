const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    renderTab: PropTypes.func,

    //custom props
    height: PropTypes.number,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    activeTabColors: PropTypes.object,
    inactiveTabColors: PropTypes.object,
    underlineStyle: PropTypes.object
  },

  renderTabOption(name, page) {
  },

  renderTab(
    tab,
    page,
    isTabActive,
    onPressHandler,
    props
  ) {

    const { textStyle, iconStyle, activeTabColors, inactiveTabColors } = props

    const textColor = isTabActive
      ? activeTabColors ? activeTabColors.text.color : styles.tabsColors.activeTextColor
      : inactiveTabColors ? inactiveTabColors.text.color : styles.tabsColors.inactiveTextColor

    const tintColor = isTabActive
      ? activeTabColors ? activeTabColors.icon.color : styles.tabsColors.activeIconColor
      : inactiveTabColors ? inactiveTabColors.icon.color : styles.tabsColors.inactiveIconColor

    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      style={{ flex: 1, }}
      key={tab.tabLabel}
      accessible={true}
      accessibilityLabel={tab.tabLabel}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab]}>
        {tab.tabIcon &&
          <Image
            resizeMode={'contain'}
            source={tab.tabIcon}
            style={[
              { width: 32, height: 32, },
              iconStyle ? iconStyle : {},
              { tintColor }
            ]}
          />
        }
        <Text
          style={[
            {
              color: textColor, fontWeight,
            },
            textStyle ? textStyle : {}
          ]}
        >
          {tab.tabLabel}
        </Text>
      </View>
    </Button>;
  },

  render() {
    const { containerWidth, tabs, height, containerStyle, goToPage, activeTab, underlineStyle } = this.props
    const numberOfTabs = tabs.length;

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[
        styles.tabs,
        { backgroundColor: styles.tabsColors.backgroundColor, },
        height ? { height } : {},
        containerStyle ? containerStyle : {},
      ]}>
        {
          this.props.tabs.map((tab, page) => {
            const isTabActive = activeTab === page;
            const renderTab = this.renderTab;
            return renderTab(tab, page, isTabActive, goToPage, this.props);
          })
        }
        <Animated.View
          style={
            [
              styles.tabUnderlineStyle,
              underlineStyle ? underlineStyle : {},
              {
                width: containerWidth / numberOfTabs,
              },
              {
                transform: [
                  { translateX },
                ]
              },
            ]}
        />
      </View>
    );
  },
});

const styles = {
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  tabs: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'green',
    bottom: 0,
  },
  tabsColors: {
    activeIconColor: '#ff5de6',
    inactiveIconColor: 'white',
    activeTextColor: '#ff5de6',
    inactiveTextColor: 'white',
    backgroundColor: null,
  }
};

module.exports = DefaultTabBar;
