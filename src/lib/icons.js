import {
  siPython,
  siApacheairflow,
  siPostgresql,
  siStreamlit,
  siFlask,
  siTypescript,
  siTerraform,
  siZod,
  siPytorch,
  siTensorflow,
  siLangchain,
  siMlflow,
  siFastapi,
  siScikitlearn,
  siNextdotjs,
  siSpringboot,
  siKong,
  siDocker,
  siJupyter,
  siSvelte
} from 'simple-icons';

// tag string from projects.json → simple-icons entry (null = text-only pill)
const MAP = {
  Python: siPython,
  Airflow: siApacheairflow,
  PostgreSQL: siPostgresql,
  Streamlit: siStreamlit,
  Flask: siFlask,
  TypeScript: siTypescript,
  Terraform: siTerraform,
  Zod: siZod,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  LangChain: siLangchain,
  MLflow: siMlflow,
  FastAPI: siFastapi,
  'scikit-learn': siScikitlearn,
  'Next.js': siNextdotjs,
  'Spring Boot': siSpringboot,
  Kong: siKong,
  Docker: siDocker,
  Jupyter: siJupyter,
  Svelte: siSvelte
};

export function iconFor(tag) {
  return MAP[tag] ?? null;
}
