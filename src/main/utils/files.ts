import { readFile, writeFile } from 'fs/promises'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { consoleError } from '../index'
// types
import { TReadJsonAsync, TReadJsonSync, TFileName } from '../../types/file'

export const readJsonAsync: TReadJsonAsync = async (fileName) => {
  try {
    const buffer = await readFile(join(__dirname, `../../configs/${fileName}.json`))
    const data = JSON.parse(buffer.toString())
    return data
  } catch (error) {
    consoleError(error)
  }
}

export const writeJsonAsync = async (fileName: TFileName, file: any) => {
  try {
    await writeFile(
      join(__dirname, `../../configs/${fileName}.json`),
      JSON.stringify(file, null, 4)
    )
  } catch (error) {
    consoleError(error)
  }
}

export const readJsonSync: TReadJsonSync = (fileName) => {
  try {
    const buffer = readFileSync(join(__dirname, `../../configs/${fileName}.json`))
    const data = JSON.parse(buffer.toString())
    return data
  } catch (error) {
    consoleError(error)
  }
}

export const writeJsonSync = (fileName: TFileName, file: any) => {
  try {
    writeFileSync(join(__dirname, `../../configs/${fileName}.json`), JSON.stringify(file, null, 4))
  } catch (error) {
    consoleError(error)
  }
}
