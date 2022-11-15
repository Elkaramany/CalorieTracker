declare module '@env' {
    export const NUTRITIONIX_URL: string;
    export const NUTRITIONIX_APP_ID: string;
    export const NUTRITIONIX_APP_KEY: string;
}

declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}