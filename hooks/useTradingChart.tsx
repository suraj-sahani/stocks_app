import { useEffect, useRef } from "react";

type Props = {
  scriptUrl: string,
  config: Record<string, unknown>,
  height?: number,
}
export const useTradingChart = ({
  scriptUrl, config, height = 500
}: Props
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      if (!containerRef.current) return

      if (containerRef.current.dataset.loaded) return
      console.log(height)
      containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget style="width: 100%; height=${height}px"></div>`

      const script = document.createElement("script");
      script.src = scriptUrl
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify(config)

      containerRef.current?.appendChild(script);
      containerRef.current.dataset.loaded = "true"

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
          delete containerRef.current.dataset.loaded
        }
      }
    },
    [scriptUrl, config, height]
  );

  return containerRef;
}

export default useTradingChart;
