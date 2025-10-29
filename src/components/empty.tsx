import { IconFolderCode } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { SetStateAction, Dispatch } from "react"

type EmptyDemoProp = {
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

export function EmptyDemo({setModalOpen}:EmptyDemoProp) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Tasks Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any tasks yet. Get started by creating
          your first task.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={() => setModalOpen(true)}>Create Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        {/* <a href="#">
          Learn More <ArrowUpRightIcon />
        </a> */}
      </Button>
    </Empty>
  )
}
