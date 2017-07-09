import React from "react";

export default function infiniteScroll(threshold) {
  return function(InnerComponent) {
    return class extends React.Component {
      constructor() {
        super();
        this.state = {
          loading: false
        };
      }

      componentDidMount() {
        window.addEventListener("scroll", this.scrollHandler.bind(this));
      }

      scrollHandler() {
        const nearPageBottom =
          window.innerHeight + document.body.scrollTop >
          document.body.offsetHeight - threshold;
        if (nearPageBottom && !this.state.loading) {
          this.setState({ loading: true });
          this.props.scrollHandler().finally(() => {
            this.setState({ loading: false });
          });
        }
      }

      render() {
        return <InnerComponent {...this.props} />
      }
    };
  }
}
