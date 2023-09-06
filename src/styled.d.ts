import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentBgColor: string;
        accentTextColor: string;
        boxColor: string;
        secondBoxColor: string;
        contentText: string;
        contentLeft: string;
    }
}
