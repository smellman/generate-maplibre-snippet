import React from 'react'
import { Box, Code, Heading } from '@chakra-ui/react'
import { ClipboardButton, ClipboardRoot } from './components/ui/clipboard'

interface CodeSnippetProps {
  code: string
  iframeCode: string
  openGoogleMaps: string
}

export const CodeSnippet: React.FC<CodeSnippetProps> = React.memo(({
  code,
  iframeCode,
  openGoogleMaps,
}) => {
  return (
    <div id="code-snippet" style={{ width: "100%", height: "100vh" }}>
      <Heading size="lg" letterSpacing={"tight"}>
        Code Snippet
      </Heading>
      <ClipboardRoot value={code}>
        <ClipboardButton>Copy</ClipboardButton>
      </ClipboardRoot>
      <Box
        as="pre"
        whiteSpace="pre-wrap"
        overflow="auto"
        p="4"
        bg="gray.800"
        color="white"
        borderRadius="md"
        maxH="100vh"
        width="500px"
        textAlign="left"
      >
        <Code>{code}</Code>
      </Box>
      <Heading size="md" letterSpacing={"tight"}>
        Embed iframe
      </Heading>
      <ClipboardRoot value={iframeCode}>
        <ClipboardButton>Copy</ClipboardButton>
      </ClipboardRoot>
      <Box
        as="pre"
        whiteSpace="pre-wrap"
        overflow="auto"
        p="4"
        bg="gray.800"
        color="white"
        borderRadius="md"
        maxH="100vh"
        width="500px"
        textAlign="left"
      >
        <Code>{iframeCode}</Code>
      </Box>
      <ClipboardRoot value={openGoogleMaps}>
        <ClipboardButton>Copy</ClipboardButton>
      </ClipboardRoot>
      <Box
        as="pre"
        whiteSpace="pre-wrap"
        overflow="auto"
        p="4"
        bg="gray.800"
        color="white"
        borderRadius="md"
        maxH="100vh"
        width="500px"
        textAlign="left"
      >
       <Code>{openGoogleMaps}</Code>
      </Box>
    </div>
  )
})
