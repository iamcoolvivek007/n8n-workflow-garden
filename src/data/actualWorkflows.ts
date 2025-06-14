
import { Workflow } from '../types/workflow';

// Import all the actual n8n workflow files
import zlHbtHIcCZ9enKwg from '../../zlHbtHIcCZ9enKwg_v1_helper_-_Find_params_with_affected_expressions.json';
import ynTqojfUnGpG2rBP from '../../ynTqojfUnGpG2rBP_Merge_multiple_runs_into_one.json';
import z0C6H2kYSgML2dib from '../../z0C6H2kYSgML2dib_📦_New_Email_➔_Create_Google_Task.json';
import YVNJOltj0jMQatGz from '../../YVNJOltj0jMQatGz_Stripe_Payment_Order_Sync_–_Auto_Retrieve_Customer_&_Product_Purchased.json';
import Zp0R3I1dUjZOIz2l from '../../Zp0R3I1dUjZOIz2l_Sync_New_Shopify_Customers_to_Odoo_Contacts.json';
import yxv7OYbDEnqsqfa9 from '../../yxv7OYbDEnqsqfa9_WhatsApp_starter_workflow.json';
import ziJG3tgG91Gkbina from '../../ziJG3tgG91Gkbina_n8n-農產品.json';
import zic2ZEHvxHR4UAYI from '../../zic2ZEHvxHR4UAYI_Import_multiple_CSV_to_GoogleSheet.json';
import zAkPoRdcG5M5x4KT from '../../zAkPoRdcG5M5x4KT_Perform_an_email_search_with_Icypeas_(single).json';
import YKZBEx4DTf0KGEBR from '../../YKZBEx4DTf0KGEBR_Image-Based_Data_Extraction_API_using_Gemini_AI.json';
import yCIEiv9QUHP8pNfR from '../../yCIEiv9QUHP8pNfR_Build_Custom_AI_Agent_with_LangChain_&_Gemini_(Self-Hosted).json';
import yPIST7l13huQEjY5 from '../../yPIST7l13huQEjY5_Use_XMLRPC_via_HttpRequest-node_to_post_on_Wordpress.com.json';
import ZI0PxugfKsyepqeH from '../../ZI0PxugfKsyepqeH_Shopify_order_UTM_to_Baserow.json';
import YCQFaJdmJc6Rx4o7 from '../../YCQFaJdmJc6Rx4o7_Sync_Jira_issues_with_subsequent_comments_to_Notion_database.json';
import yYjRbTWULZuNLXM0 from '../../yYjRbTWULZuNLXM0_My_workflow.json';

// Helper function to categorize workflows based on their content
function categorizeWorkflow(workflow: any): string {
  const name = workflow.name.toLowerCase();
  const nodes = workflow.nodes || [];
  
  // Check for specific service integrations
  if (name.includes('shopify') || nodes.some((n: any) => n.type?.includes('shopify'))) return 'E-commerce';
  if (name.includes('stripe') || nodes.some((n: any) => n.type?.includes('stripe'))) return 'Payments';
  if (name.includes('email') || name.includes('gmail') || nodes.some((n: any) => n.type?.includes('gmail'))) return 'Email & Communication';
  if (name.includes('whatsapp') || nodes.some((n: any) => n.type?.includes('whatsApp'))) return 'Communication';
  if (name.includes('ai') || name.includes('gemini') || name.includes('langchain') || nodes.some((n: any) => n.type?.includes('gemini') || n.type?.includes('langchain'))) return 'AI & Machine Learning';
  if (name.includes('notion') || name.includes('jira') || nodes.some((n: any) => n.type?.includes('notion') || n.type?.includes('jira'))) return 'Project Management';
  if (name.includes('csv') || name.includes('sheet') || nodes.some((n: any) => n.type?.includes('googleSheets') || n.type?.includes('spreadsheet'))) return 'Data Processing';
  if (name.includes('webhook') || name.includes('api') || nodes.some((n: any) => n.type?.includes('webhook') || n.type?.includes('httpRequest'))) return 'API & Webhooks';
  if (name.includes('crm') || name.includes('odoo') || name.includes('baserow')) return 'CRM & Database';
  if (name.includes('helper') || name.includes('utility')) return 'Utilities';
  
  return 'General';
}

// Helper function to get complexity based on node count
function getComplexity(nodeCount: number): 'Simple' | 'Medium' | 'Complex' {
  if (nodeCount <= 5) return 'Simple';
  if (nodeCount <= 10) return 'Medium';
  return 'Complex';
}

// Helper function to generate use case based on category and name
function generateUseCase(category: string, name: string): string {
  const useCases: Record<string, string> = {
    'E-commerce': 'Streamline online store operations and customer management',
    'Payments': 'Automate payment processing and financial workflows',
    'Email & Communication': 'Enhance communication and email automation',
    'Communication': 'Improve team communication and messaging workflows',
    'AI & Machine Learning': 'Leverage AI for data processing and intelligent automation',
    'Project Management': 'Optimize project tracking and task management',
    'Data Processing': 'Automate data transformation and analysis workflows',
    'API & Webhooks': 'Integrate systems through APIs and webhook automation',
    'CRM & Database': 'Manage customer relationships and database operations',
    'Utilities': 'Provide helpful utilities and workflow assistance',
    'General': 'General purpose automation and workflow management'
  };
  return useCases[category] || 'Automated workflow for enhanced productivity';
}

// Helper function to estimate setup time based on complexity
function getEstimatedSetupTime(complexity: 'Simple' | 'Medium' | 'Complex'): string {
  switch (complexity) {
    case 'Simple': return '10-15 min';
    case 'Medium': return '20-30 min';
    case 'Complex': return '45-60 min';
    default: return '15-30 min';
  }
}

// Convert n8n workflows to our Workflow type
function convertN8nWorkflow(n8nWorkflow: any): Workflow {
  const nodeCount = n8nWorkflow.nodes?.length || 0;
  const category = categorizeWorkflow(n8nWorkflow);
  const complexity = getComplexity(nodeCount);
  
  // Extract unique node types for tags and connectors - ensure they are strings
  const nodeTypes = (n8nWorkflow.nodes || []).map((node: any) => {
    const type = node.type || '';
    return String(type).replace('n8n-nodes-base.', '').replace('@n8n/n8n-nodes-langchain.', '');
  }).filter(Boolean);
  
  const uniqueNodeTypes: string[] = [...new Set(nodeTypes)].slice(0, 5); // Limit to 5 tags
  const connectors: string[] = [...new Set(nodeTypes)].slice(0, 4); // Limit to 4 connectors
  
  return {
    id: n8nWorkflow.id,
    name: n8nWorkflow.name,
    description: `n8n workflow with ${nodeCount} nodes. ${category} automation workflow.`,
    category,
    tags: uniqueNodeTypes,
    nodeCount,
    complexity,
    isActive: n8nWorkflow.active || false,
    lastModified: new Date().toISOString(),
    version: n8nWorkflow.versionId ? '1.0' : '1.0',
    author: 'n8n User',
    nodes: n8nWorkflow.nodes || [],
    useCase: generateUseCase(category, n8nWorkflow.name),
    estimatedSetupTime: getEstimatedSetupTime(complexity),
    connectors: connectors
  };
}

// Convert all imported workflows
export const actualWorkflows: Workflow[] = [
  convertN8nWorkflow(zlHbtHIcCZ9enKwg),
  convertN8nWorkflow(ynTqojfUnGpG2rBP),
  convertN8nWorkflow(z0C6H2kYSgML2dib),
  convertN8nWorkflow(YVNJOltj0jMQatGz),
  convertN8nWorkflow(Zp0R3I1dUjZOIz2l),
  convertN8nWorkflow(yxv7OYbDEnqsqfa9),
  convertN8nWorkflow(ziJG3tgG91Gkbina),
  convertN8nWorkflow(zic2ZEHvxHR4UAYI),
  convertN8nWorkflow(zAkPoRdcG5M5x4KT),
  convertN8nWorkflow(YKZBEx4DTf0KGEBR),
  convertN8nWorkflow(yCIEiv9QUHP8pNfR),
  convertN8nWorkflow(yPIST7l13huQEjY5),
  convertN8nWorkflow(ZI0PxugfKsyepqeH),
  convertN8nWorkflow(YCQFaJdmJc6Rx4o7),
  convertN8nWorkflow(yYjRbTWULZuNLXM0)
];

export const categories = [
  'All',
  'AI & Machine Learning',
  'API & Webhooks', 
  'Communication',
  'CRM & Database',
  'Data Processing',
  'E-commerce',
  'Email & Communication',
  'General',
  'Payments',
  'Project Management',
  'Utilities'
];
