
"use client"
import useTradingChart from '@/hooks/useTradingChart';
import React, { memo } from 'react';
import { TradingChartProps } from '@/lib/types';
import { cn } from '@/lib/utils';

function TradingViewWidget({ title, scriptUrl, config, height, className }: TradingChartProps) {
  const container = useTradingChart({ scriptUrl, config, height });
  return (
    <div className={"w-full"}>
      {title && <h3 className='font-semibold text-2xl mb-5 text-gray-100'>{title}</h3>}
      <div className={cn("tradingview-widget-container", className)} ref={container}>
        <div className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
