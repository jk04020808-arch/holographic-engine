/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'motion/react';
import { Play, UploadCloud, Cpu, Layers, Braces, ArrowRight, Github, Mail, SlidersHorizontal, Code2 } from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white flex justify-center items-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 3 : 1,
        opacity: isHovering ? 0.8 : 1,
      }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="w-1 h-1 bg-black rounded-full"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  
  const { scrollYProgress } = useScroll();

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const heroY = useTransform(smoothScrollY, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(smoothScrollY, [0, 0.15], [1, 0]);
  const bgGlow = useTransform(smoothScrollY, [0, 1], ["rgba(0,242,255,0.02)", "rgba(168,85,247,0.03)"]);

  useEffect(() => {
    // Simulate compilation sequence
    const timer = setTimeout(() => setIsInitializing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black-bg gap-6 font-mono text-xs">
        <motion.div 
          className="w-12 h-12 border border-cyan-glow/30 rounded-sm flex justify-center items-center relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            className="w-2 h-2 bg-cyan-glow absolute"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="h-10 overflow-hidden text-cyan-glow flex flex-col items-center">
          <motion.div
             animate={{ y: [0, -100] }}
             transition={{ duration: 2, ease: "linear" }}
             className="flex flex-col items-center whitespace-pre text-center opacity-60"
          >
            {`> 编译着色器...
> 注入 WebGL 上下文...
> 初始化粒子缓冲区...
> 分配通用内存...
> 解析矩阵...
> 系统就绪。`}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-black-bg min-h-screen text-text-muted font-sans relative selection:bg-cyan-glow/30 selection:text-white"
      style={{ backgroundColor: bgGlow as any }}
    >
      <div className="bg-noise" />
      <CustomCursor />

      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          {/* Abstract 3D placeholder graphics via pure CSS/SVG */}
          <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-cyan-glow/20 rounded-full flex justify-center items-center relative">
            <div className="w-full h-[1px] bg-cyan-glow/20 absolute rotate-45 transform" />
            <div className="w-full h-[1px] bg-cyan-glow/20 absolute -rotate-45 transform" />
            <div className="w-[70%] h-[70%] border border-purple-void/20 rounded-full absolute" />
          </div>
        </motion.div>

        <motion.div 
          className="z-10 text-center flex flex-col items-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[12vw] sm:text-[10vw] leading-[0.8] font-bold tracking-tighter text-text-main text-gradient"
          >
            物质
            <span className="block italic font-light opacity-50">& 虚空</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-sm sm:text-base max-w-md text-center opacity-70 font-mono"
          >
            探索实体网格与粒子云之间的边界。
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Phase 01: Deconstruction */}
      <section className="min-h-screen flex items-center relative py-32 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="font-mono text-cyan-glow text-xs uppercase tracking-widest flex items-center">
              <span className="w-8 h-[1px] bg-cyan-glow mr-4" /> 阶段一
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-semibold text-white tracking-tight">
              物质解构 (Deconstruction)
            </h2>
            <p className="text-lg opacity-70 max-w-md leading-relaxed">
              将任何实体三维资产实时蜕变转化为数百万个悬浮粒子。重写几何结构，释放受限形态。
            </p>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="aspect-square max-w-md mx-auto border border-dashed border-text-dark/50 rounded-lg flex flex-col justify-center items-center relative group overflow-hidden bg-white/[0.02] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-glow/0 via-cyan-glow/0 to-cyan-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <UploadCloud className="w-12 h-12 text-text-dark group-hover:text-cyan-glow transition-colors duration-500 mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-text-dark group-hover:text-white transition-colors duration-500">
                拖拽上传 .glb / .gltf
              </div>
              <div className="mt-2 font-mono text-[10px] text-text-dark/50">
                最大文件大小限制：50MB
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Phase 02: Particle Matrix */}
      <section className="min-h-screen flex items-center relative py-32 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
          <div className="space-y-8 relative z-10 w-full lg:w-1/2">
            <div className="font-mono text-purple-void text-xs uppercase tracking-widest flex items-center">
              <span className="w-8 h-[1px] bg-purple-void mr-4" /> 阶段二
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-semibold text-white tracking-tight">
              微观操控 (Micro-control)
            </h2>
            <p className="text-lg opacity-70 leading-relaxed">
              掌控粒子矩阵。调节粒子分布密度与浮动强度，模拟空间重力异常与量子态演化。
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-12 border border-white/5 bg-white/[0.01] p-10 rounded-2xl backdrop-blur-sm">
            {/* Mock slider 1 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div className="font-mono text-xs text-white uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3 text-text-dark" /> 粒子密度 (Density)
                </div>
                <div className="font-mono text-xs text-cyan-glow">2,500,000 粒子</div>
              </div>
              <div className="relative w-full h-[1px] bg-white/10 group cursor-none interactive">
                <div className="absolute top-0 left-0 h-full bg-cyan-glow shadow-[0_0_10px_rgba(0,242,255,0.5)] w-[85%]" />
                <div className="absolute top-1/2 left-[85%] -translate-y-1/2 w-3 h-3 bg-white rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>
            </div>

            {/* Mock slider 2 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div className="font-mono text-xs text-white uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3 text-text-dark" /> 浮动程度 (Float Intensity)
                </div>
                <div className="font-mono text-xs text-purple-void">0.45 G</div>
              </div>
              <div className="relative w-full h-[1px] bg-white/10 group cursor-none interactive">
                <div className="absolute top-0 left-0 h-full bg-purple-void shadow-[0_0_10px_rgba(168,85,247,0.5)] w-[45%]" />
                <div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-3 h-3 bg-white rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>
            </div>

            <div className="mt-4 border-t border-white/5 pt-6 grid grid-cols-2 gap-4 opacity-50">
               <div>
                 <div className="font-mono text-[10px] uppercase text-text-dark mb-1">色彩模式</div>
                 <div className="font-mono text-xs text-white">顶点颜色 (Vertex Colors)</div>
               </div>
               <div>
                 <div className="font-mono text-[10px] uppercase text-text-dark mb-1">混合模式</div>
                 <div className="font-mono text-xs text-white">叠加 (Additive)</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Phase 03: Materialization */}
      <section className="min-h-screen flex flex-col justify-center items-center relative py-32 px-6 overflow-hidden">
        
        {/* Glow effect from bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-glow/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-10%] translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-glow/20 blur-[100px] rounded-[100%]" />

        <div className="text-center z-10 max-w-3xl border-l border-r border-white/5 px-8 py-16 backdrop-blur-sm">
          <div className="font-mono text-white text-xs uppercase tracking-widest mb-8">
             阶段三 // 光感重铸
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-8">
            代码锻造之光 (Light Forged from Code)
          </h2>
          <p className="text-lg opacity-70 leading-relaxed font-mono">
            自定义 GLSL 顶点着色器（Vertex Shader）驱动史诗般的八秒过渡。随着变量步进，Y 轴坐标与平滑阶跃缓动函数（Smooth Step Easing）交织，于混沌尘埃中重铸坚实形态。
          </p>

          <div className="mt-12 bg-black-bg/50 border border-white/10 p-6 rounded text-left overflow-x-auto text-[10px] sm:text-xs">
<pre className="font-mono text-text-dark">
<span className="text-purple-void">void</span> main() {'{'}
  <span className="text-text-muted">vec3</span> pos = position;
  <span className="text-text-muted">float</span> scanY = uScProgress * <span className="text-cyan-glow">100.0</span>;
  <span className="text-text-muted">float</span> dist = <span className="text-cyan-glow">abs</span>(pos.y - scanY);
  
  pos.x += <span className="text-cyan-glow">sin</span>(uTime * frequency) * amplitude;
  
  <span className="text-cyan-glow">gl_Position</span> = projectionMatrix * modelViewMatrix * <span className="text-text-muted">vec4</span>(pos, <span className="text-cyan-glow">1.0</span>);
{'}'}
</pre>
          </div>
        </div>
      </section>

      {/* 5. Technical Highlights (Bento Grid) */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display text-3xl text-white mb-16 tracking-tight flex items-center gap-4">
            <Layers className="w-6 h-6 text-cyan-glow" /> 系统架构与核心技术
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto] gap-4">
            
            {/* Box 1 */}
            <div className="col-span-1 md:col-span-2 border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors rounded-xl flex flex-col justify-between">
              <Cpu className="w-8 h-8 text-cyan-glow mb-8" />
              <div>
                <h4 className="font-mono text-white text-sm uppercase mb-2">极限性能 (Maximum Performance)</h4>
                <p className="font-mono text-xs opacity-60">运用 Instanced Mesh 渲染架构，在浏览器原生实现高达 250 万独立粒子的实时计算，并保持丝滑的 60 FPS 面板帧率。</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="col-span-1 border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors rounded-xl flex flex-col justify-between">
              <Code2 className="w-8 h-8 text-purple-void mb-8" />
              <div>
                <h4 className="font-mono text-white text-sm uppercase mb-2">着色器注入 (Shader Injection)</h4>
                <p className="font-mono text-xs opacity-60">通过截获 <code className="bg-white/10 px-1 rounded">onBeforeCompile</code> 钩子，在不破坏原生材质特性的前提下将 GLSL 注入 Three.js 管线。</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="col-span-1 border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors rounded-xl flex flex-col justify-between">
              <Braces className="w-8 h-8 text-white mb-8" />
             <div>
                <h4 className="font-mono text-white text-sm uppercase mb-2">React 生态融合 (React Ecosystem)</h4>
                <p className="font-mono text-xs opacity-60">使用 Hooks 与 Refs，将 React 严格生命周期与复杂的 Three.js 渲染事件循环无缝深度融合。</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="col-span-1 md:col-span-2 border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors rounded-xl relative overflow-hidden group">
               <div className="absolute right-[-10%] top-[-50%] w-64 h-64 border border-cyan-glow/20 rounded-full group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute right-[5%] top-[-20%] w-32 h-32 border border-purple-void/20 rounded-full group-hover:scale-90 transition-transform duration-700" />
               <div className="relative z-10 w-2/3">
                  <h4 className="font-display text-4xl text-white mb-4 tracking-tight">开源信念。</h4>
                  <p className="font-mono text-xs opacity-60 mb-8">部署它，Fork 它，解构它。边界的存在，不就是为了被重构吗？</p>
                  
                  <a href="https://github.com/jk04020808-arch/lizi-shiti" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-mono text-cyan-glow hover:text-white transition-colors group/btn interactive inline-flex">
                     探索 GitHub 仓库 <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-white/10 pt-24 pb-12 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,242,255,0.02)_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-4 text-gradient">
               准备好部署<br/>你的虚拟现实了吗？
            </h2>
            <div className="flex gap-6 mt-8 justify-center md:justify-start">
               <a href="https://lizi-shiti.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 font-mono text-xs uppercase font-bold hover:bg-cyan-glow hover:text-black transition-colors rounded interactive flex items-center justify-center">
                 在线演示 (Live Demo)
               </a>
               <a href="https://github.com/jk04020808-arch/lizi-shiti" target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-6 py-3 font-mono text-xs uppercase hover:bg-white/5 transition-colors rounded flex items-center interactive">
                 <Github className="w-4 h-4 mr-2" /> 代码仓库
               </a>
            </div>
          </div>

        </div>
        
        <div className="w-full h-[1px] bg-white/10 mt-16 mb-8" />
        <div className="text-center font-mono text-[10px] opacity-40 uppercase">
          &copy; {new Date().getFullYear()} Holographic Engine Project. MIT License.
        </div>
      </footer>

    </motion.div>
  );
}
