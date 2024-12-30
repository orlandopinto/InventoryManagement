export type Attributes = {
     id: string
     attributeName: string
}

export type AttributeValues = {
     id: string
     attributeId: string
     attributeValue: string
}

export type AttributesViewModel = {
     attributes: Attributes[]
     attributeValues: AttributeValues[]
}