export interface ViewModel<TProps> {
  props: TProps;
  useHooks(): void;
}
