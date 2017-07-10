import React from "react";

export default function infiniteScroll(threshold) {
  return function(InnerComponent) {
    return class extends React.Component {
      constructor() {
        super();
        this.state = {
          loading: false
        };

        this.scrollHandler = this.scrollHandler.bind(this);
      }

      componentDidMount() {
        window.addEventListener("scroll", this.scrollHandler);
      }

      componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandler);
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
        return <InnerComponent {...this.props} />;
      }
    };
  };
}
