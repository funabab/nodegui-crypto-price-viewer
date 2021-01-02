import React from 'react'
import { Text, View, Image, Button } from '@nodegui/react-nodegui'
import BannerImage from '../../../assets/images/error-banner.png'
import { colorHover, colorPressed } from '../../utils'

function ConnectionErrorView() {
  return (
    <View styleSheet={styleSheet} id="connection-error">
      <View id="view-wrapper">
        <Image
          id="image"
          size={{ width: 502, height: 316 }}
          src={BannerImage}
        ></Image>
        <Text id="text-title">SERVER IS CURRENTLY UNREACHABLE</Text>
        <Text id="text-detail">MAKE SURE YOU HAVE ACTIVE CONNECTION</Text>
        <Button id="action-btn" flat={true}>
          Try Again
        </Button>
      </View>
    </View>
  )
}

const styleSheet = `
    #connection-error {
        background-color: #F3F3F3;
        display: flex;
        align-items: "center";
        justify-content: "center";
    }

    #view-wrapper {
        background-color: #DEDEDE;
        align-self: "stretch";
        align-items: "center";
        justify-content: "center";
        padding-top: 40px;
        padding-bottom: 40px;
    }

    #image {
        width: 502px;
        height: 316px;
    }

    #text-title, #text-detail {
        color: #404040;
        text-transform: uppercase;
        font-family: Roboto;
    }

    #text-title {
        font-size: 30px;
        font-weight: 500;
        margin-top: 5px;
    }

    #text-detail {
        font-size: 18px;
        margin-top: 2px;
        margin-bottom: 6px;
    }

    #view-wrapper QPushButton:flat {
        text-transform: uppercase;
        color: #00D1D1;
        border-radius: 10px;
        border: 2px solid #00D1D1;
        font-size: 14px;
        height: 45px;
        width: 207px;
        font-weight: bold;
    }

    #view-wrapper QPushButton:hover {
        background-color: ${colorHover('#DEDEDE')};
    }

    #view-wrapper QPushButton:pressed {
        background-color: ${colorPressed('#DEDEDE')};
    }
`

export default ConnectionErrorView
