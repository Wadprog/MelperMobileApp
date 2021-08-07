import { View, StyleSheet, ensureComponentIsNative } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

class ImageBackground extends Component {
  setNativeProps(props) {
    const viewRef = this._viewRef
    if (viewRef) {
      ensureComponentIsNative(viewRef)
      viewRef.setNativeProps(props)
    }
  }

  _viewRef = null

  _captureRef = (ref) => {
    this._viewRef = ref
  }

  render() {
    const { children, style, imageStyle, imageRef, ...props } = this.props

    return (
      <View
        accessibilityIgnoresInvertColors
        style={style}
        ref={this._captureRef}
      >
        <Image
          {...props}
          style={[
            StyleSheet.absoluteFill,
            {
              width: style.width,
              height: style.height,
            },
            imageStyle,
          ]}
          ref={imageRef}
        />
        {children}
      </View>
    )
  }
}

export default ImageBackground
