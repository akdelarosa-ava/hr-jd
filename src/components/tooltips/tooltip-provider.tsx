import {
  Tooltip,
  TooltipContent,
  TooltipProvider as TooltipProviderComponent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  tip: ReactNode
}

const TooltipProvider = ({tip, children}:Props) => {
  return (
    <TooltipProviderComponent>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {tip}
        </TooltipContent>
      </Tooltip>
    </TooltipProviderComponent>
  )
}

export default TooltipProvider