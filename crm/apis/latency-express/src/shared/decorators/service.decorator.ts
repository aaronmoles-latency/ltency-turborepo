export const Service = (): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        return target
    }
}
