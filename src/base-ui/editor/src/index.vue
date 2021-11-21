<template>
	<div>
		<div class="header">
			<el-input
				type="text"
				placeholder="请输入标题"
				v-model.lazy="content.title"
			/>
			<el-button type="primary" @click="handleClick">提交</el-button>
		</div>
		<div
			ref="editorRef"
			class="hy-editor"
			:style="{ width: width ? `${width}px` : '100%' }"
		></div>
	</div>
</template>

<script lang="ts" setup>
	import {
		defineProps,
		withDefaults,
		watch,
		onMounted,
		onBeforeUnmount,
		ref,
		reactive,
		defineEmits
	} from 'vue'
	import type Editor from 'wangeditor'
	import WangEditor from 'wangeditor'
	export interface EditorInfo {
		html: string
		text: string
		title: string
	}
	const props = withDefaults(
		defineProps<{
			// 数据双向绑定
			value: string
			title: string
			zIndex?: number
			height?: number
			width?: number
			focus?: boolean
		}>(),
		{
			value: '',
			title: '',
			zIndex: 500,
			height: 500,
			width: 0,
			focus: false
		}
	)
	const emits = defineEmits<{
		(e: 'update:value', value: string): void
		(e: 'update:title', value: string): void
		(e: 'handleClick'): void
	}>()

	const editorRef = ref<HTMLDivElement | null>(null)
	// 是否初始化文本
	const isInitContent = ref<boolean>(false)
	const content = reactive<EditorInfo>({
		html: '',
		text: '',
		title: ''
	})
	// WangEditor实例
	const instance = ref<Editor | null>(null)

	watch(
		() => props.value,
		() => {
			initEditorContent(props.value, true)
		}
	)
	watch(
		() => content.title,
		() => {
			emits('update:title', content.title)
		}
	)

	onMounted(() => {
		createWangEditor()
	})

	onBeforeUnmount(() => {
		if (!instance.value) return
		instance.value.destroy()
		instance.value = null
	})

	const createWangEditor = () => {
		// 创建WangEditor
		instance.value = new WangEditor(editorRef.value)
		setEditorConfig()
		instance.value.create()
		// create 之后才能初始化
		// initEditorContent(props.defaultHtmlStr)
		initEditorContent(props.value)
	}

	const initEditorContent = (htmlStr: string, isFocus = false) => {
		if (!instance.value) return
		const editor: Editor = instance.value as Editor
		editor.config.focus = isFocus
		if (!htmlStr) return
		isInitContent.value = true
		editor.txt.html(htmlStr)
	}

	const setEditorConfig = () => {
		if (!instance.value) return
		const editor: Editor = instance.value as Editor
		// 设置编辑区域高度为 500px
		editor.config.height = props.height
		// 设计z-index
		editor.config.zIndex = props.zIndex
		// 取消自动 focus
		editor.config.focus = props.focus
		// 配置 onchange 回调函数
		editor.config.onchange = function (newHtml: string) {
			content.html = newHtml
			content.text = editor.txt.text()
			if (!isInitContent.value) {
				emits('update:value', content.html)
			}
			// 最后标记为 false
			isInitContent.value = false
		}
		// 配置触发 onchange 的时间频率，默认为 200ms
		editor.config.onchangeTimeout = 500 // 修改为 500ms
		// 配置菜单栏，删减菜单，调整顺序
		editor.config.menus = [
			'head',
			'bold',
			'fontSize',
			'fontName',
			'italic',
			'underline',
			'strikeThrough',
			'indent',
			'lineHeight',
			'foreColor',
			'backColor',
			'link',
			'list',
			// 'todo',
			'justify',
			'quote',
			// 'emoticon',
			// 'image',
			// 'video',
			// 'table',
			'code',
			'splitLine',
			'undo',
			'redo'
		]
	}

	// 方法
	const handleClick = () => {
		emits('handleClick')
	}
</script>

<style lang="less" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.hy-editor {
		text-align: left;
	}
</style>
